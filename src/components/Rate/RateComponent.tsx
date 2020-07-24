import React, { Fragment, useState } from "react";
import './rate.scss';
import { ButtonGroup, Button, Container, Col, Row } from "reactstrap";

export enum ModalTypes {
    people,
    movies
}

type MyProps = {
    type: ModalTypes;
    changeRate: (r: number) => void;
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
                                        <text className="text">i usually like his/her taste</text>
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
                                        <text className="text">i often agree with him/her</text>
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
                                        <text className="text">i have unrelated interests</text>
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
                                        <text className="text">i often disagree with him/her</text>
                                    </Row>
                                </Button>
                            </Row>
                            <Row className="fullwidth">
                                <Button className="fullwidth" onClick={() => setRate(1)}>
                                    <Row>
                                        <div className="stars">
                                            <span className="fa fa-star fa-lg" />
                                        </div>
                                        <text className="text">i usually dislike his/her taste</text>
                                    </Row>
                                </Button>
                            </Row>
                        </Container>
                    </ButtonGroup>
                    <Row>
                        <Button onClick={() => props.changeRate(rate)} className="button2">Submit Rate</Button>
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
                                        <text className="text">must watch movie before death</text>
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
                                        <text className="text">highly recommended</text>
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
                                        <text className="text">not a bad movie</text>
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
                                        <text className="text">waste of money</text>
                                    </Row>
                                </Button>
                            </Row>
                            <Row className="fullwidth">
                                <Button className="fullwidth" onClick={() => setRate(1)}>
                                    <Row>
                                        <div className="stars">
                                            <span className="fa fa-star fa-lg" />
                                        </div>
                                        <text className="text">waste of time</text>
                                    </Row>
                                </Button>
                            </Row>
                        </Container>
                    </ButtonGroup>
                    <Row>
                        <Button onClick={() => props.changeRate(rate)} className="button2">Submit Rate</Button>
                    </Row>
                </Fragment>
            );
    }


}