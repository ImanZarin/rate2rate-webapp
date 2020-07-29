// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, Fragment, ChangeEvent } from 'react';
import { MyFetch } from '../../shared/my-fetch';
import { MovieUserNames } from "../../shared/ApiTypes"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Row, Col } from 'reactstrap';
import './home.scss';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type MyProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tr: any;
}

type MyState = {
    recentMovies: MovieUserNames[];
}

class HomeComponent extends Component<MyProps & RouteComponentProps<any>, MyState> {
    myfetchObjet = new MyFetch();
    constructor(props: MyProps & RouteComponentProps<any>) {
        super(props);

        this.state = {
            recentMovies: [{
                movieId: "",
                userId: "",
                movieTitle: "",
                userName: "",
                rate: 0
            }]
        };
    }


    render(): JSX.Element {
        return (
            <Fragment>
                <h3>{this.props.tr("home-livelist-title")}</h3>
                {this.state.recentMovies.map((mu) => {
                    return (
                        <Row>
                            <Col sm={1}></Col>
                            <Col sm={3} onClick={() => this.props.history.push("/user" + mu.userId)}
                                className="list_user">
                                {mu.userName}
                            </Col>
                            <Col sm={4} onClick={() => this.props.history.push("/movie/" + mu.movieId)}
                                className="list_movie">
                                {mu.movieTitle}
                            </Col>
                            <Col sm={3}>
                                <span style={{ visibility: mu.rate > 0 ? "visible" : "hidden" }}
                                    className={"filled_star fa fa-star"} />
                                <span style={{ visibility: mu.rate > 1 ? "visible" : "hidden" }}
                                    className={"filled_star fa fa-star"} />
                                <span style={{ visibility: mu.rate > 2 ? "visible" : "hidden" }}
                                    className={"filled_star fa fa-star"} />
                                <span style={{ visibility: mu.rate > 3 ? "visible" : "hidden" }}
                                    className={"filled_star fa fa-star"} />
                                <span style={{ visibility: mu.rate > 4 ? "visible" : "hidden" }}
                                    className={"filled_star fa fa-star"} />
                            </Col>
                            <Col sm={1}></Col>
                        </Row>
                    );
                })}
            </Fragment>
        );
    }
}

export default withRouter(HomeComponent);