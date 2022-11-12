import dayjs from "dayjs";
import "dayjs/locale/ko";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.locale("ko");
dayjs.extend(localizedFormat);

export default dayjs;
