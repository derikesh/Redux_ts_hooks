import { formatDistanceToNow, parseISO } from "date-fns";

export default function TimeAgo( {timeStap}:any ) {

    let timeAGo= '';
    const date = parseISO(timeStap);
    const newAgo = formatDistanceToNow(date);
    timeAGo = `${newAgo} ago`;

  return (
    <div>{timeAGo}</div>
  )
}
