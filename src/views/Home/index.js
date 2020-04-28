/*
* @Author: 王宸
* @Date:   2019-12-24 17:33:30
* @Last Modified by:   王宸
* @Last Modified time: 2020-04-26 20:57:53
*/
import React, {
  useState, 
  useRef, 
  Suspense,
  lazy
} from 'react';
import Logo from './img/logo.png'

import { 
  Layout, 
  Menu, 
  Icon, 
  Avatar, 
  Input,
  Button 
} from 'antd';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

import {
  Route,
  Link,
  withRouter,
  Redirect
} from "react-router-dom";

import {
  logoutReq
} from '@store/login/actionCreators'

import {
  userInfoChange
} from '@store/user/actionCreators'

import {
  searchInfoChange,
  searchInfoGet
} from '@store/search/actionCreators'

import FileUp from '@views/FileUp'
import Searches from '@views/Search'
import UserInfo from '@views/UserInfo'
import NotFound from "@comp/NotFound"
import VideoGrid from '@comp/VideoGrid'

import { connect } from 'react-redux';
import axios from '@utils/axios'

import Loading from '@comp/Loading'

// import Video from '@views/Video'
// import VideoHot from '@views/VideoHot'
// import VideoRecommend from '@views/VideoRecommend'
// import VideoKind from '@views/VideoKind'
// import UserCollection from '@views/UserCollection'


const Video = lazy(() => import('@views/Video'));
const VideoHot = lazy(() => import('@views/VideoHot'));
const VideoRecommend = lazy(() => import('@views/VideoRecommend'));
const VideoKind = lazy(() => import('@views/VideoKind'));
const UserCollection = lazy(() => import('@views/UserCollection'));

const Hom = (props) => {

  const [collapsed, setCollapsed] = useState(false);
  const [menuStyle, setMenuStyle] = useState({
    menuWidth: 220,
  });

  const refSearchButton = useRef(null);

  const toggle = () => {

    let width = 300 - document.getElementById("menus").offsetWidth
    setCollapsed(!collapsed);

    setMenuStyle({
      menuWidth: width,
    })

    // startTransition(() => {
    //   setMenuStyle({
    //     menuStyle.menuWidth: width,
    //   })
    // });
  };

  
  const _search = e => {
    let value = e.target.value
    props.search(value)
  }

  const searchButton = () => {
    let value = refSearchButton.current.state.value
    props.search(value)
  }
  
  const takeLogout = () => {
    window.localStorage.setItem('Authorization', null);
    let user_info = {
                      avatarUrl: '',
                      id: '',
                      name: '',
                      mail: '',
                      sex: 0,
                      sign: '',
                      fettle: '',
                      createTime: ''
                    }
    props.toLogout(user_info)
  }

  const selfToken = () => {
    let token = window.localStorage.getItem('Authorization')
    // 这个地方非常坑 不管token是null还是有值,都会执行if true方法, 
    // 原因是null被当成“null”字符串了(谷歌浏览器发现有这个问题)
    if (token && token !== 'null') {
      return true
    }else{
      return false
    }
  }


  return (
      <div>
        <Layout>
        <Header style={{ 
          width: '100vw',
          height: '54px',
          background: '#fff', 
          padding: 0,
          lineHeight: '0',
          textAlign: 'center',
          display: 'inline',
          position: 'fixed', 
          zIndex: 1
        }}>
  
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={() => toggle()}
          style={{
            float: 'left',
            marginTop: '22px'
          }}
        />
        <div className="_logo" style={{
          display: 'inline'
        }}>
          <Link to="/">
            <img src={Logo} alt="网络连接失败..." style={{
              marginTop: '11px',
              width: '76px',
              height: '36px',
              float: 'left'
            }}/>
          </Link>
        </div>

        <div className="_search" style={{
          width: '60%',
          textAlign: 'center',
          display: 'inline'
        }}>
            <Input ref={refSearchButton} placeholder="input search text" 
                style={{
                  marginTop: '10px',
                  width: '35%',
                  borderRadius: '0px',
                }} onPressEnter={e => _search(e)} onChange={e => _search(e)}/>
              <Button onClick={() => searchButton()} style={{
                borderRadius: '0px',
              }} icon="search" />
            
        </div>
        <div className="_avatar" style={{
          float: 'right',
          marginRight: '20px',
          marginTop: '4px'
        }}>
            <div>
              <Link to="/aurora/user/info">
                <Avatar size={45} icon="user" src={props.user_info.avatarUrl}/>
              </Link>
            </div>
        </div>
          </Header>
          <Layout style={{
                marginTop: '54px'
          }}>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{
                width: '100vw',
                height: '100vh',
                background: '#fff',
                overflow: 'auto',
                position: 'fixed'
              }}>
              <Menu id='menus' theme="light" mode="inline" defaultSelectedKeys={['1']} style={{color: '#000'}}>

                <SubMenu
                  key="video"
                  title={
                    <span>
                      <Icon type="play-circle" />
                      <span>视频</span>
                    </span>
                  }
                  style={{
                    marginTop: '20px'
                  }}
                >
                  <Menu.Item key="video_recommend">
                    <Link to="/aurora/">
                      <span>推荐</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="video_hot">
                    <Link to="/aurora/hot">
                      <span>热门</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="video_kind">
                    <Link to="/aurora/video_kind">分类</Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu
                  key="user"
                  title={
                    <span>
                      <Icon type="user" />
                      <span>用户</span>
                    </span>
                  }
                >
                  <Menu.Item key="user_collection">
                    <Link to="/aurora/user/collection">收藏</Link>
                  </Menu.Item>
                  <Menu.Item key="user_info">
                    <Link to="/aurora/user/info">账号信息</Link>
                  </Menu.Item>
                  <Menu.Item key="user_upload">
                    <Link to="/aurora/user/upload">视频上传</Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu
                  key="setting"
                  title={
                    <span>
                      <Icon type="setting" />
                      <span>设置</span>
                    </span>
                  }
                >
                  <Menu.Item key="setting_theme">
                    <Link to="/aurora/setting/theme">主题设置</Link>
                  </Menu.Item>
                  <Menu.Item key="setting_logout">
                    <span onClick={takeLogout}>注销</span>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
              
              <Content
                style={{
                  margin: '24px 16px',
                  marginLeft: menuStyle.menuWidth + 'px',
                  padding: 24,
                  background: '#fff',
                  minHeight: '86vh',
                  overflow: 'initial'
                }}
              >
        
              <Suspense fallback={<Loading/>}>
                <Route path="/aurora/" exact component={VideoRecommend} />
                <Route path="/aurora/hot" exact component={VideoHot} />
                <Route path="/aurora/search" exact component={Searches} />
                <Route path="/aurora/video/:id" exact component={Video} />
                <Route path="/aurora/video_kind" exact component={VideoKind} />
                <Route path="/aurora/user/collection" exact  render={
                          (props)=>{
                              return selfToken()?
                              <Route   component={UserCollection} {...props}/>:<Redirect to='/login'/>
                          }
                      } />
                 <Route path="/aurora/user/info" exact render={
                          (props)=>{
                              return selfToken()?
                              <Route  component={UserInfo} {...props}/>:<Redirect to='/login'/>
                          }
                      }/>
                 <Route path="/aurora/user/upload" exact render={
                          (props)=>{
                              return selfToken()?
                              <Route component={FileUp} {...props}/>:<Redirect to='/login'/>
                          }
                      }/>
              </Suspense>
              </Content>
          </Layout>
        </Layout>        
      </div>
    )
}

const Home = withRouter(Hom);

const mapStateToProps = (state) => {
    return {
        ...state.user,
        ...state.search,
        ...state.login
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toLogout(user_info) {
            const action = logoutReq(user_info);
            dispatch(action);
        },
        search(word) {
            const action = searchInfoGet(word);
            dispatch(action);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

