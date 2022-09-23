import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

class Loader extends Component {
    state = {}

    render() {
        // const {loadingState} = this.props;
        if(!this.props.loadingState) return null;

        return (
            <Fragment>


                <div className="cssload-loader mt-5">
                    <div className="cssload-inner cssload-one"></div>
                    <div className="cssload-inner cssload-two"></div>
                    <div className="cssload-inner cssload-three"></div>
                </div>
                
                    </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    loadingState: state.loading.loadingState,
    sets: state.sets.sets,
  });

export default connect (mapStateToProps)(Loader);