import React from "react";
import PageStateKit from "./StateKit";

const getGlobalService = (id) => {
    if (!id) return global;
    if (!global[id]) global[id] = {};
    return global[id];
};

const ServiceStateBuilder = ({ id, service, pageStateKit = PageStateKit }) => {
    const _service = React.useMemo(() => service || getGlobalService(id), []);
    [_service.state, _service.setState] = React.useState(_service.state);

    return React.useMemo(() => {
        let PageState = getBuilder(_service.state);
        return <PageState service={_service} />;
    }, [_service.state]);
};

export default React.useMemo(ServiceStateBuilder);
function getBuilder(serviceState) {
    let _state;
    if (typeof serviceState === "string") {
        _state = serviceState;
    } else if (typeof serviceState === "object") {
        _state = serviceState.state;
    }
    return PageStateKit[_state] || PageStateKit.none;
}
