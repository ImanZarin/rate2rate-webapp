// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

type MyProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tr: any;
}

export const LOADING = (props: MyProps): JSX.Element => {
    return (
        <div className="col-12" style={{
            overflow: 'overlay', opacity: 0.75, position: 'fixed', top: 0, left: 0,
            zIndex: 10, height: '100%', width: '100%', background: '#3c2f2f'
        }}>
            <div style={{ position: 'fixed', top: '50%', left: '50%', color: '#fff4e6' }}>
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw"></span>
                <p>{props.tr("loading-text")} . . .</p>
            </div>

        </div>
    );
}