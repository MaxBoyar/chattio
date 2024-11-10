import styled from 'styled-components';
import { Tooltip } from 'antd';

//region [[ Styles ]]
const StyledTooltip = styled(Tooltip)`
    //.ant-tooltip-inner {
    //    background-color: #333333 !important;
    //    background-color: #c46868 !important;
    //    color: green !important;
    //}
    .ant-tooltip .ant-tooltip-inner {
        background-color: #111218 !important; /* Your desired background color */
        color: #ffffff !important; /* Optional: change text color */
    }
`;
//endregion [[ Styles ]]
//TODO: delete this if no use
function CustomTooltip(props) {
    return (
        <StyledTooltip
            placement="topRight"
            title={'Search contanct'}
            arrow={false}
        >
            <div>{props.children}</div>
        </StyledTooltip>
    );
}

export default CustomTooltip;
