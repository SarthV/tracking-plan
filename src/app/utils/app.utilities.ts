const generateTrackingPlanId = () => {
    const time = new Date().getTime().toString();
    const randomPart = Math.floor(Math.random() * 100);
    return `TP${time}${randomPart}`;
}

const generateEventId = () => {
    const time = new Date().getTime().toString();
    const randomPart = Math.floor(Math.random() * 100);
    return `EV${time}${randomPart}`;
}

export default {
    generateTrackingPlanId,
    generateEventId
}