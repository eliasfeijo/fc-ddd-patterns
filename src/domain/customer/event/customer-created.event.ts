import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;
  constructor(customer: Customer) {
    this.dataTimeOccurred = new Date();
    this.eventData = {
      id: customer.id,
      name: customer.name,
      address: customer.Address,
    };
  }
}
