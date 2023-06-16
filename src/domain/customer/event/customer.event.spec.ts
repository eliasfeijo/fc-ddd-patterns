import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerChangedAddressLogHandler from "./handler/customer-changed-address-log.handler";
import CustomerCreatedLog1Handler from "./handler/customer-created-log-1.handler";
import CustomerCreatedLog2Handler from "./handler/customer-created-log-2.handler";

describe("Customer events tests", () => {
  afterEach(() => {
    EventDispatcher.getInstance().unregisterAll();
  });

  it("should notify when customer is created", () => {
    const eventHandler = new CustomerCreatedLog1Handler();
    const eventHandler2 = new CustomerCreatedLog2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    EventDispatcher.getInstance().register(
      "CustomerCreatedEvent",
      eventHandler
    );
    EventDispatcher.getInstance().register(
      "CustomerCreatedEvent",
      eventHandler2
    );

    expect(
      EventDispatcher.getInstance().getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    new Customer("123", "John Doe");

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should notify when customer address is changed", () => {
    const eventHandler = new CustomerChangedAddressLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    EventDispatcher.getInstance().register(
      "CustomerChangedAddressEvent",
      eventHandler
    );

    expect(
      EventDispatcher.getInstance().getEventHandlers[
        "CustomerChangedAddressEvent"
      ][0]
    ).toMatchObject(eventHandler);

    const customer = new Customer("123", "John Doe");
    customer.changeAddress(new Address("Street", 1, "1234", "City"));

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
