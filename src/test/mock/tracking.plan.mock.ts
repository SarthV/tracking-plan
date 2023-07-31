import { TrackingPlan } from "../../app/entity/tracking.plan.entity";

const createTrackingPlanSuccessMock = {
    name: "test-11",
    description: "test",
    events: [
        {
            name : "pop-11",
            description: "test",
            rules: {
                key: "value"
            }
        }       
    ]
};

const trackingPlanListMock = [
    {
        name: "test-11",
        description: "test",
        events: [
            {
                name : "pop-11",
                description: "test",
                rules: {
                    key: "value"
                }
            }       
        ]
    },
    {
        name: "test-14",
        description: "test-2",
        events: [
            {
                name : "pop-11",
                description: "test",
                rules: {
                    key: "value"
                }
            }       
        ]
    }
] as TrackingPlan[];

export default {
    trackingPlanListMock
}