import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import LoginContainer from "./containers/LoginContainer";

const Routes = () => (

      <Router>
	 
	<LoginContainer>
			<Route path="/" component={LoginPage} />
		</LoginContainer>
	
      </Router>
 
);
export default Routes;