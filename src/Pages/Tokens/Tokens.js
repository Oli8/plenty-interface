import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { tokenFetchingThunk } from '../../redux/slices/tokens/tokens.thunk';
import styles from './tokens.module.scss';
import { connect } from 'react-redux';
import Table from '../../Components/Table/Table';
import Button from '../../Components/Ui/Buttons/Button';
import { PuffLoader } from 'react-spinners';
import { BsSearch, BsStar, BsStarFill } from 'react-icons/bs';
import { FormControl, Image, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* TODO
1. Favorite Token
2. Token Search V
3. Token symbol
 */
const Tokens = (props) => {
  const [imgPaths, setImgPath] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const value = '; ' + document.cookie;
    const parts = value.split('; fav_tokens=');
    if (parts.length === 2) {
        const fav = parts.pop().split(',');
        setFavorites(fav);
    }
  }, []);

  const onclick = (tokenSymbol) => {
      const copy = [...favorites];
        copy.includes(tokenSymbol) ?
          copy.splice(favorites.indexOf(tokenSymbol), 1)
          : copy.push(tokenSymbol);
      setFavorites(copy);
  }

    const TokenCell = row => {
        const [isFavorite, setIsFavorite] = useState(false);

        useEffect(() => {
            console.log('in use effect');
            setIsFavorite(favorites.includes(row.value));
        }, [favorites])

        return (
            <div className="d-flex pl-2 align-items-center">
                {isFavorite ?
                    <BsStarFill onClick={() => onclick(row.value)} className="mx-3" />
                    : <BsStar onClick={() => onclick(row.value)} className="mx-3" />
                }
                {' '}
                <Image src={imgPaths[row.value]?.url} height={32} width={32} alt={''} />
                <span className="ml-2">{row.value}</span>
            </div>
        );
    };

  const loadImageFor = useCallback(
    (token) => {
      // ? if token exists, abort
      if (!!imgPaths[token]) {
        return;
      }

      setImgPath((prev) => ({
        ...prev,
        [token]: {
          ...prev[token],
          loading: true,
        },
      }));

      import(`../../assets/images/tokens/${token}.png`).then((image) => {
        setImgPath((prev) => ({
          ...prev,
          [token]: {
            url: image['default'] ?? image,
            loading: false,
          },
        }));
      });
    },
    [imgPaths],
  );

  useEffect(() => {
    props.tokens.data.forEach((datum) => {
      loadImageFor(datum.symbol_token);
    });
  }, [loadImageFor, props.tokens.data]);

  const positiveOrNegative = (value) => {
    if (Number(value) > 0) {
      return <span className={styles.greenText}>+{value}%</span>;
    } else if (Number(value) < 0) {
      return <span className={styles.redText}>{value}%</span>;
    } else {
      return value;
    }
  };

  const valueFormat = (value) => {
    if (value >= 100) {
      return Math.round(value).toLocaleString('en-US');
    }
    return value.toLocaleString('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  const stringSort = useMemo(
    () => (rowA, rowB, columnId) => {
      const a = String(rowA.values[columnId]).toLowerCase();
      const b = String(rowB.values[columnId]).toLowerCase();
      return a.localeCompare(b);
    },
    [],
  );

  const numberSort = useMemo(
    () => (rowA, rowB, columnId) => {
      const a = parseFloat(rowA.values[columnId]);
      const b = parseFloat(rowB.values[columnId]);
      return a > b ? 1 : -1;
    },
    [],
  );

  const columns = useMemo(
    () => [
      {
        Header: (
          <div className="d-flex pl-2 align-items-center">
              <BsStar className="mx-3" />{' '}
                  <span>Token</span>
          </div>
        ),
        id: 'token',
        accessor: 'symbol_token',
        sortType: stringSort,
        Cell: (row) => <TokenCell {...row} />/*(
          <div className="d-flex pl-2 align-items-center">
            {/!*<BsStar className="mx-3" />{' '}*!/}
            <Image src={imgPaths[row.value]?.url} height={32} width={32} alt={''} />
            <span className="ml-2">{row.value}</span>
          </div>
        ),*/
      },
      {
        Header: 'Price',
        accessor: 'token_price',
        sortType: numberSort,
        Cell: (row) => <span>${valueFormat(row.value)}</span>,
      },
      {
        Header: '24H Change',
        accessor: 'price_change_percentage',
        sortType: numberSort,
        Cell: (row) => <span>{positiveOrNegative(valueFormat(row.value))}</span>,
      },
      {
        Header: '24H Volume',
        accessor: 'volume_token',
        sortType: numberSort,
        Cell: (row) => <span>${valueFormat(row.value)}</span>,
      },
      {
        Header: 'Liquidity',
        accessor: 'liquidity',
        sortType: numberSort,
        Cell: (row) => <span>${valueFormat(row.value)}</span>,
      },
      {
        disableSortBy: true,
        Header: '',
        id: 'trade',
        accessor: (x) => (
          <Link to={`/swap?from=${x.symbol_token}`}>
            <Button className={styles.tradeBtn}>Trade</Button>
          </Link>
        ),
        width: 120,
      },
    ],
    [imgPaths, numberSort, stringSort],
  );

  useEffect(() => {
    const fetchDataContinuously = () => {
      props.fetchTokensData();
    };

    fetchDataContinuously();
    const backgroundRefresh = setInterval(() => {
      fetchDataContinuously();
    }, 30 * 1000);

    return () => clearInterval(backgroundRefresh);
    //props.fetchTokensData();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Container fluid className={styles.tokens}>
      <div className="w-100 d-flex justify-content-between px-5">
        <h5 className="font-weight-bolder">Tokens</h5>
        <InputGroup className={styles.searchBar}>
          <span className={styles.iconInside}>
            <BsSearch />
          </span>
          <FormControl
            placeholder="        Search"
            className={`rounded ${styles.placeholder}`}
            value={searchQuery}
            onChange={(ev) => setSearchQuery(ev.target.value)}
          />
        </InputGroup>
      </div>

      {props.tokens.data.length > 0 ? (
        <div>
          <Table searchQuery={searchQuery} data={props.tokens.data} columns={columns} />
        </div>
      ) : (
        <PuffLoader color={'#813CE1'} size={56} />
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    tokens: state.tokens.tokensData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTokensData: () => dispatch(tokenFetchingThunk()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tokens);
