// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CardImg, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import './card.scss';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PercnetageCircle from '../PercentageCircle';
import { useHistory } from 'react-router-dom';

type MyProps = {
    imgUrl: string;
    imgLink: string;
    rate: number;
    title: string;
    titleLink: string;
    subtitle: string;
    likebility: number;
    isPercent: boolean;
}

export const MY_CARD = (props: MyProps): JSX.Element => {
    const history = useHistory();
    let scoringSection;
    if (props.isPercent)
        scoringSection = <div style={{ marginTop: "-30px", marginLeft: "-10px" }}>
            <PercnetageCircle circleSize={0}
                percent={props.likebility}
                duration={0}
                offset={0}
                fontColor=''
                circleColor=''
                circleInnerColor=''>
            </PercnetageCircle>
        </div>;
    else
        scoringSection = <div style={{ marginTop: "-30px", marginLeft: "-10px" }}>
            <span style={{ visibility: props.rate > 0 ? "visible" : "hidden" }}
                className={"filled_star fa fa-star"} />
            <span style={{ visibility: props.rate > 1 ? "visible" : "hidden" }}
                className={"filled_star fa fa-star"} />
            <span style={{ visibility: props.rate > 2 ? "visible" : "hidden" }}
                className={"filled_star fa fa-star"} />
            <span style={{ visibility: props.rate > 3 ? "visible" : "hidden" }}
                className={"filled_star fa fa-star"} />
            <span style={{ visibility: props.rate > 4 ? "visible" : "hidden" }}
                className={"filled_star fa fa-star"} />
        </div>;

    return (
        <Card className="card-main"
        style={{  }}>
            <CardImg src={props.imgUrl} top width="100%"
                style={{ cursor: "pointer" }}
                onClick={() => history.push(props.imgLink)} />
            <CardBody>
                {scoringSection}
                <CardTitle style={{ fontWeight: "bold", cursor: "pointer", marginLeft: "-10px", fontSize: "14px" }}
                    className="my_text_overflow"
                    onClick={() => history.push(props.titleLink)}>
                    {props.title}
                </CardTitle>
                <CardSubtitle className="my_text_overflow" style={{
                    marginLeft: "-10px",
                    width: "auto",
                    fontSize: "small",
                }}>
                    {props.subtitle}
                </CardSubtitle>
            </CardBody>
        </Card>
    );
}