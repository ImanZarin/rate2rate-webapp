// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert } from 'reactstrap';

type MyProps = {
    color: string;
    message: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyAlert = (props: MyProps): JSX.Element => {
    const [visible, setVisible] = useState(true);

    const onDismiss = (): void => setVisible(false);

    return (
        <Alert color={props.color} isOpen={visible} toggle={onDismiss}
            style={{ overflow: 'overlay', position: 'fixed', bottom: 0, zIndex: 9, height: '100%' }}>
            {props.message}
        </Alert>
    );
}

export default MyAlert;