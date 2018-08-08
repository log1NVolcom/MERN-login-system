import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { login} from "../actions/logActions";
import LoginPage from "../components/LoginPage";

const mapStateToProps = (data, ownProps) => ({
  data,
  ownProps
});

const mapDispatchToProps = dispatch => ({
  login: credentials => {
    dispatch(login(credentials));
  }
});


export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage)
);
