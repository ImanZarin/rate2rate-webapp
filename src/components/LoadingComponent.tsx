import React from 'react';

type myProps = {
    tr: any,
}

export const Loading = (props: myProps) => {
    return (
        <div className="col-12" style={{
            overflow: 'overlay', opacity: 0.5, position: 'fixed', top: 0, left: 0,
            zIndex: 10, height: '100%', width: '100%', background: '#000'
        }}>
            <div style={{ position: 'fixed', top: '50%', left: '50%' }}>
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>{props.tr("loading-text")} . . .</p>
            </div>
            
        </div>
    );
}