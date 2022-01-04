import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import truncateMiddle from 'truncate-middle';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import clsx from 'clsx';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { ReactComponent as LogoWhite } from '../../assets/images/logo-white.svg';
import { Link, useLocation } from 'react-router-dom';
import { RPC_NODE } from '../../constants/localStorage';
import { setNode } from '../../redux/slices/settings/settings.slice';
import { connect } from 'react-redux';
import Button from '../Ui/Buttons/Button';
import HeaderBottom from './HeaderBottom';
import useMediaQuery from '../../hooks/mediaQuery';

const Header = (props) => {
  const isMobile = useMediaQuery('(max-width: 991px)');
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');
  const [selectedHeader, setSelectedHeader] = useState('');
  const [isExpanded, toggleExpand] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const RPCNodeInLS = localStorage.getItem(RPC_NODE);
    if (RPCNodeInLS) {
      props.setNode(RPCNodeInLS);
    }
  }, []);

  useEffect(() => {
    toggleExpand(false);
  }, [splitLocation[1]]);

  const connectWalletButton = () => {
    if (props.walletAddress) {
      return (
        <Button onClick={props.disconnectWallet} className="button-bg">
          <span>{truncateMiddle(props.walletAddress, 4, 4, '...')}</span>
        </Button>
      );
    } else {
      return (
        <Button
          onClick={props.connecthWallet}
          className={clsx('px-md-3', 'connect-wallet-btn', 'button-bg')}
        >
          <div className={clsx('connect-wallet-btn')}>
            <div className="flex flex-row align-items-center">
              <span className={clsx('mr-1', 'material-icons-round')}>add</span>
              <span>Connect to Wallet</span>
            </div>
          </div>
        </Button>
      );
    }
  };

  const setHeader = (value) => {
    toggleExpand(!isExpanded);
    setSelectedHeader(value);
  };

  return (
    <>
      <Container className="header" fluid>
        <Row>
          <Col className="innerHeader" sm={12} md={12}>
            <Navbar collapseOnSelect expand="lg" className="px-0 mx-sm-4 menu-wrapper">
              <Navbar.Brand as={Link} to="/" className="col-4 m-0">
                {props.isGradientBgPage ? (
                  <LogoWhite />
                ) : props.theme === 'light' ? (
                  <Logo />
                ) : (
                  <LogoWhite />
                )}
              </Navbar.Brand>
              <Nav.Item className="ml-auto d-lg-none align-self-lg-end">
                <a
                  className="flex header-click nav-menu-item-link px-lg-3 align-self-end align-self-lg-center"
                  onClick={props.toggleTheme}
                >
                  {props.theme === 'light' ? (
                    <span
                      className={clsx(
                        'theme-icon',
                        'material-icons-round',
                        props.isGradientBgPage ? 'icon-white' : 'span-themed',
                      )}
                    >
                      dark_mode
                    </span>
                  ) : (
                    <span className="theme-icon span-themed material-icons-round">light_mode</span>
                  )}
                </a>
              </Nav.Item>
              <Nav.Item className="ml-3 d-lg-none align-self-lg-end">
                {connectWalletButton()}
              </Nav.Item>
              <Navbar.Toggle
                aria-controls="responsive-navbar-nav"
                className="ml-lg-auto flex header-click"
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <span
                    className={clsx(
                      'material-icons-round',
                      props.isGradientBgPage ? 'text-white' : 'span-themed',
                    )}
                  >
                    close
                  </span>
                ) : (
                  <span
                    className={clsx(
                      'material-icons-round',
                      props.isGradientBgPage ? 'text-white' : 'span-themed',
                    )}
                  >
                    menu
                  </span>
                )}
              </Navbar.Toggle>

              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="align-items-lg-center w-100">
                  <div className="col-lg-6 d-lg-flex flex-lg-row flex-column justify-content-lg-center align-items-center links">
                    <Nav.Link
                      className={clsx(
                        selectedHeader === 'trade' ? 'menu-item-active' : 'menu-item',
                        'align-self-start align-self-lg-center d-lg-flex align-items-center',
                        'space-between',
                      )}
                      onClick={() => setHeader('trade')}
                    >
                      <span className={clsx(props.isGradientBgPage ? 'text-white' : undefined)}>
                        Trade
                      </span>
                      <span
                        className={clsx(
                          'material-icons',
                          'arrow',

                          selectedHeader === 'trade' && 'rotate',
                        )}
                      >
                        keyboard_arrow_up
                      </span>
                    </Nav.Link>
                    {selectedHeader === 'trade' && isMobile && (
                      <HeaderBottom
                        selectedHeader={selectedHeader}
                        isExpanded={isExpanded}
                        {...props}
                      />
                    )}
                    <Nav.Link
                      className={clsx(
                        selectedHeader === 'earn' ? 'menu-item-active' : 'menu-item',
                        'align-self-end align-self-lg-center d-lg-flex align-items-center',
                      )}
                      onClick={() => setHeader('earn')}
                    >
                      <span className={clsx(props.isGradientBgPage ? 'text-white' : undefined)}>
                        Earn
                      </span>
                      <span
                        className={clsx(
                          'material-icons',
                          'arrow',
                          selectedHeader === 'earn' && 'rotate',
                        )}
                      >
                        keyboard_arrow_up
                      </span>
                    </Nav.Link>
                    {selectedHeader === 'earn' && isMobile && (
                      <HeaderBottom
                        selectedHeader={selectedHeader}
                        isExpanded={isExpanded}
                        {...props}
                      />
                    )}

                    <Nav.Link
                      className={clsx(
                        selectedHeader === 'vote' ? 'menu-item-active' : 'menu-item',
                        'align-self-end align-self-lg-center d-lg-flex align-items-center',
                      )}
                      onClick={() => setHeader('vote')}
                    >
                      <span className={clsx(props.isGradientBgPage ? 'text-white' : undefined)}>
                        Vote
                      </span>
                      <span
                        className={clsx(
                          'material-icons',
                          'arrow',
                          selectedHeader === 'vote' && 'rotate',
                        )}
                      >
                        keyboard_arrow_up
                      </span>
                    </Nav.Link>
                    {selectedHeader === 'vote' && isMobile && (
                      <HeaderBottom
                        selectedHeader={selectedHeader}
                        isExpanded={isExpanded}
                        {...props}
                      />
                    )}
                    {isMobile && (
                      <Nav.Link
                        className={clsx(
                          selectedHeader === 'settings' ? 'menu-item-active' : 'menu-item',
                          'align-self-end align-self-lg-center d-lg-flex align-items-center',
                          'd-lg-none',
                        )}
                        onClick={() => setHeader('settings')}
                      >
                        <span className={clsx(props.isGradientBgPage ? 'text-white' : undefined)}>
                          Settings
                        </span>
                        <span className={clsx('material-icons', 'arrow', 'align-self-end')}>
                          settings
                        </span>
                      </Nav.Link>
                    )}
                    {selectedHeader === 'settings' && isMobile && (
                      <HeaderBottom
                        selectedHeader={selectedHeader}
                        isExpanded={isExpanded}
                        {...props}
                      />
                    )}
                    <Nav.Link
                      className={clsx(
                        selectedHeader === 'more' ? 'menu-item-active' : 'menu-item',
                        'align-self-end align-self-lg-center d-lg-flex align-items-center',
                      )}
                      onClick={() => setHeader('more')}
                    >
                      <span className={clsx(props.isGradientBgPage ? 'text-white' : undefined)}>
                        More
                      </span>
                      <span
                        className={clsx(
                          'material-icons',
                          'arrow',
                          selectedHeader === 'more' && 'rotate',
                        )}
                      >
                        keyboard_arrow_up
                      </span>
                    </Nav.Link>
                    {selectedHeader === 'more' && isMobile && (
                      <HeaderBottom
                        selectedHeader={selectedHeader}
                        isExpanded={isExpanded}
                        {...props}
                      />
                    )}
                  </div>
                  <div className="col-lg-6 d-lg-flex flex-column flex-lg-row align-items-end align-items-lg-center last">
                    <Nav.Item className="ml-auto">
                      <a
                        className="flex header-click nav-menu-item-link px-lg-3 align-self-end align-self-lg-center"
                        onClick={props.toggleTheme}
                      >
                        {props.theme === 'light' ? (
                          <span
                            className={clsx(
                              'theme-icon',
                              'material-icons-round',
                              props.isGradientBgPage ? 'icon-white' : 'span-themed',
                            )}
                          >
                            dark_mode
                          </span>
                        ) : (
                          <span className="theme-icon span-themed material-icons-round">
                            light_mode
                          </span>
                        )}
                      </a>
                    </Nav.Item>

                    <Nav.Item className="d-none d-lg-block align-self-lg-end">
                      {connectWalletButton()}
                    </Nav.Item>
                    <Nav.Item>
                      <span
                        className={clsx(
                          'ml-3',
                          'flex header-click align-items-center material-icons-round',
                          props.isGradientBgPage ? 'text-white' : 'span-themed',
                        )}
                        onClick={() => setHeader('settings')}
                      >
                        settings
                      </span>
                    </Nav.Item>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
      {!isMobile && (
        <HeaderBottom
          selectedHeader={selectedHeader}
          isExpanded={isExpanded}
          page={splitLocation[1]}
          {...props}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  rpcNode: state.settings.rpcNode,
});

const mapDispatchToProps = (dispatch) => ({
  setNode: (rpcNode) => dispatch(setNode(rpcNode)),
});

Header.propTypes = {
  connecthWallet: PropTypes.func,
  disconnectWallet: PropTypes.func,
  isGradientBgPage: PropTypes.bool,

  setNode: PropTypes.func,
  theme: PropTypes.string,
  toggleTheme: PropTypes.func,
  walletAddress: PropTypes.oneOf(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
