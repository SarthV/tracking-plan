import sinon from "sinon";
import trackingPlanRepositoryHelper from "../app/repository/tracking.plan.repository.helper";
import trackingPlanService from "../app/service/tracking.plan.service";
import trackingPlanMock from "./mock/tracking.plan.mock";


/* The test cases are placeholders for now so as to give an idea as to how 
we can do a workaround for stubbing the getRepository() method.
Need to resolve some library import issues before executing these UTs. 
**/
describe("Get tracking plans", () => {
    afterEach(() => {
    sinon.restore();
    })

    it("Should get all the tracking plans with their asociated events from the DB",async () => {
        sinon.stub(trackingPlanRepositoryHelper, 'getTrackingPlanRepository'). resolves(trackingPlanMock.trackingPlanListMock);
        const res = await trackingPlanService.getAllTrackingPlans();
        expect(res).not.toBeNull();
    });
});

describe("Create tracking plan", () => {
    
})