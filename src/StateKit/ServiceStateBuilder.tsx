import React from "react";
import getComponent from "./StateKit";

const getGlobalService = (id: any, g: any) => {
    if (!id) return g;
    if (!g[id]) g[id] = {};
    return g[id];
};

type ServiceStateBuilderProps = {
    id?: string;
    service?: any;
    getBuilder?: any;
};

const ServiceStateBuilder: React.FC<ServiceStateBuilderProps> = ({ id, service, getBuilder = _getBuilder }) => {
    const _service = React.useMemo(() => service || getGlobalService(id, global), []);
    [_service.state, _service.setState] = React.useState(_service.state);

    return React.useMemo(() => {
        let PageState = getBuilder(_service.state);
        return <PageState service={_service} />;
    }, [_service.state]);
};

export default ServiceStateBuilder;

function _getBuilder(serviceState: any) {
    let _state;
    if (typeof serviceState === "string") {
        _state = serviceState;
    } else if (typeof serviceState === "object") {
        _state = serviceState.state;
    }
    return getComponent(_state);
}
