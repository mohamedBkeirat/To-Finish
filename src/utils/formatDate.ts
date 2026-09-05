import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

export default function formatDate(date:Dayjs|string){
  return dayjs(date).format('h:mmA DD/MM/YYYY') 
}