import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PersistentDrawerLeft from './templates/drawer';
import GroupPage from './pages/groupPage';
import StudySettingPage from './pages/studySettingPage';
import StudyPage from './pages/studyPage';
import MenuPage from './pages/menuPage';
import InputPage from './pages/inputPage';
import EditPage from './pages/editPage';
import SavePage from './pages/savePage';
import LoadPage from './pages/loadPage';
import { checkInit } from './repository/setting';

type PageProps = {
};

type PageState = {
  isShow: boolean,
};

class App extends React.PureComponent<PageProps, PageState> {
  render() {
    checkInit();

    return (
      <Router>
        <PersistentDrawerLeft />
        <div className="content-area">
          <Switch>
            <Route exact path="/" component={GroupPage} />
            <Route path="/group" component={GroupPage} />
            <Route path="/menu/:groupId" component={MenuPage} />
            <Route path="/input/:groupId" component={InputPage} />
            <Route path="/studySetting/:groupId" component={StudySettingPage} />
            <Route path="/study/:groupId" component={StudyPage} />
            <Route path="/edit/:groupId" component={EditPage} />
            <Route path="/save/" component={SavePage} />
            <Route path="/load/" component={LoadPage} />
            <Route component={GroupPage} />
          </Switch>
          <div className="footer-area" />
        </div>
      </Router>
    );
  }
}

export default App;
