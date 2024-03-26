import { jwtDecode } from "jwt-decode";
import { useAuth } from "../provider/authProvider";

export const userDetails = () => {
  const { token, setToken } = useAuth();
  const decoded = jwtDecode(token);
  //   const { user_id, username, role } = decoded;
  const decodedHeader = jwtDecode(token, { header: true });
  return decoded, decodedHeader;
};
/* prints:
 * {
 *   foo: "bar",
 *   exp: 1393286893,
 *   iat: 1393268893
 * }
 */

// decode header by passing in options (useful for when you need `kid` to verify a JWT):
// console.log(decodedHeader);

/* prints:
 * {
 *   typ: "JWT",
 *   alg: "HS256"
 * }
 */
