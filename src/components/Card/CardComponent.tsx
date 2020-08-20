// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CardImg, Card, CardBody, CardTitle, CardSubtitle, Tooltip } from 'reactstrap';
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
    const [titleTooltipOpen, setTitleTooltipOpen] = useState(false);
    const [subtitleTooltipOpen, setSubtitleTooltipOpen] = useState(false);
    const titleTooltipToggle = () => {
        setTitleTooltipOpen(!titleTooltipOpen);
    };
    const subtitleTooltipToggle = () => {
        setSubtitleTooltipOpen(!subtitleTooltipOpen);
    };
    let scoringSection;
    if (props.isPercent)
        scoringSection = <div className="score-section" >
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
        scoringSection = <div className="score-section">
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
            style={{}}>
            <CardImg src={props.imgUrl} top width="100%"
                style={{ cursor: "pointer" }}
                onClick={() => history.push(props.imgLink)} />
            <CardBody>
                {scoringSection}
                <CardTitle id={"title" + props.imgLink.substr(props.imgLink.lastIndexOf("/") + 1) + props.titleLink.substr(props.imgLink.lastIndexOf("/") + 1)}
                    className="my_text_overflow card-title"
                    onClick={() => history.push(props.titleLink)}>
                    {props.title}
                </CardTitle>
                <Tooltip placement="bottom"
                    target={"title" + props.imgLink.substr(props.imgLink.lastIndexOf("/") + 1) + props.titleLink.substr(props.imgLink.lastIndexOf("/") + 1)}
                    toggle={titleTooltipToggle}
                    isOpen={titleTooltipOpen}
                    delay={500}>
                    {props.title}
                </Tooltip>
                <CardSubtitle className="my_text_overflow card-subtitle"
                    id={"subtitle" + props.imgLink.substr(props.imgLink.lastIndexOf("/") + 1) + props.titleLink.substr(props.imgLink.lastIndexOf("/") + 1)}>
                    {props.subtitle}
                    <Tooltip placement="bottom"
                        target={"subtitle" + props.imgLink.substr(props.imgLink.lastIndexOf("/") + 1) + props.titleLink.substr(props.imgLink.lastIndexOf("/") + 1)}
                        toggle={subtitleTooltipToggle}
                        isOpen={subtitleTooltipOpen}
                        delay={500}>
                        {props.subtitle}
                    </Tooltip>
                </CardSubtitle>
            </CardBody>
        </Card>
    );
}