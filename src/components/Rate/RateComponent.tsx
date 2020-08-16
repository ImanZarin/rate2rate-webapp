// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Fragment, useState } from "react";
import './rate.scss';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ButtonGroup, Button, Container, Col, Row } from "reactstrap";

export enum ModalTypes {
    people,
    movies
}

type MyProps = {
    type: ModalTypes;
    changeRate: (r: number) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tr: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function RateModal(props: MyProps): JSX.Element {

    const [rate, setRate] = useState(0);

    switch (props.type) {
        case ModalTypes.people:
            return (
                <Fragment>
                    <ButtonGroup className="fullwidth">
                        <Container>
                            <Row className="fullwidth">
                                <Button className="fullwidth" onClick={() => setRate(5)}>
                                    <Row>
                                        <div className="stars">
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                        </div>
                                        <text className="text">{props.tr("rate-user-5")}</text>
                                    </Row>
                                </Button>
                            </Row>
                            <Row className="fullwidth">
                                <Button className="fullwidth" onClick={() => setRate(4)}>
                                    <Row>
                                        <div className="stars">
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                        </div>
                                        <text className="text">{props.tr("rate-user-4")}</text>
                                    </Row>
                                </Button>
                            </Row>
                            <Row className="fullwidth">
                                <Button className="fullwidth" onClick={() => setRate(3)}>
                                    <Row>
                                        <div className="stars">
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                        </div>
                                        <text className="text">{props.tr("rate-user-3")}</text>
                                    </Row>
                                </Button>
                            </Row>
                            <Row className="fullwidth">
                                <Button className="fullwidth" onClick={() => setRate(2)}>
                                    <Row>
                                        <div className="stars">
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                        </div>
                                        <text className="text">{props.tr("rate-user-2")}</text>
                                    </Row>
                                </Button>
                            </Row>
                            <Row className="fullwidth">
                                <Button className="fullwidth" onClick={() => setRate(1)}>
                                    <Row>
                                        <div className="stars">
                                            <span className="fa fa-star fa-lg" />
                                        </div>
                                        <text className="text">{props.tr("rate-user-1")}</text>
                                    </Row>
                                </Button>
                            </Row>
                        </Container>
                    </ButtonGroup>
                    <Row>
                        <Button onClick={() => props.changeRate(rate)} className="btn-submit">{props.tr("rate-user-submit")}</Button>
                    </Row>
                </Fragment>

            );
        case ModalTypes.movies:
        default:
            return (
                <Fragment>
                    <ButtonGroup className="fullwidth">
                        <Container>
                            <Row className="fullwidth">
                                <Button className="fullwidth" onClick={() => setRate(5)}>
                                    <Row>
                                        <div className="stars">
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                        </div>
                                        <text className="text">{props.tr("rate-movie-5")}</text>
                                    </Row>
                                </Button>
                            </Row>
                            <Row className="fullwidth">
                                <Button className="fullwidth" onClick={() => setRate(4)}>
                                    <Row>
                                        <div className="stars">
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                        </div>
                                        <text className="text">{props.tr("rate-movie-4")}</text>
                                    </Row>
                                </Button>
                            </Row>
                            <Row className="fullwidth">
                                <Button className="fullwidth" onClick={() => setRate(3)}>
                                    <Row>
                                        <div className="stars">
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                        </div>
                                        <text className="text">{props.tr("rate-movie-3")}</text>
                                    </Row>
                                </Button>
                            </Row>
                            <Row className="fullwidth">
                                <Button className="fullwidth" onClick={() => setRate(2)}>
                                    <Row>
                                        <div className="stars">
                                            <span className="fa fa-star fa-lg" />
                                            <span className="fa fa-star fa-lg" />
                                        </div>
                                        <text className="text">{props.tr("rate-movie-2")}</text>
                                    </Row>
                                </Button>
                            </Row>
                            <Row className="fullwidth">
                                <Button className="fullwidth" onClick={() => setRate(1)}>
                                    <Row>
                                        <div className="stars">
                                            <span className="fa fa-star fa-lg" />
                                        </div>
                                        <text className="text">{props.tr("rate-movie-1")}</text>
                                    </Row>
                                </Button>
                            </Row>
                        </Container>
                    </ButtonGroup>
                    <Row>
                        <Button onClick={() => props.changeRate(rate)} className="btn-submit">{props.tr("rate-movie-submit")}</Button>
                    </Row>
                </Fragment>
            );
    }


}