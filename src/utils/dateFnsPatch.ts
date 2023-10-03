// dateFnsPatch.js
import { alpha } from "@material-ui/core/styles";
import { DateFnsAdapter } from "@date-io/date-fns"; // DateFnsAdapterを正しくインポート

// date-fnsのfadeをalphaにパッチ
if (typeof DateFnsAdapter !== "undefined") {
  DateFnsAdapter.prototype.fade = alpha;
}
