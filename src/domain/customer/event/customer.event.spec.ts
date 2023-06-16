import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerCreatedLog1Handler from "./handler/customer-created-log-1.handler";

describe("Customer events tests", () => {
  it("should notify when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerCreatedLog1Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const onCreated = (customer: Customer) => {
      const customerCreatedEvent = new CustomerCreatedEvent(customer);
      eventDispatcher.notify(customerCreatedEvent);
    };

    new Customer("123", "John Doe", onCreated);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
