import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class CustomerChangedAddressLogHandler
  implements EventHandlerInterface
{
  handle(event: CustomerCreatedEvent) {
    console.log("Endereço do cliente: {id}, {nome} alterado para: {endereco}");
  }
}
