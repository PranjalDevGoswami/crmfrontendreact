import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem('token');
const decoded = jwtDecode(token);

export const {user_id,username,role} = decoded
/* prints:
 * { 
 *   foo: "bar",
 *   exp: 1393286893,
 *   iat: 1393268893  
 * }
 */

// decode header by passing in options (useful for when you need `kid` to verify a JWT):
const decodedHeader = jwtDecode(token, { header: true });
// console.log(decodedHeader);

/* prints:
 * { 
 *   typ: "JWT",
 *   alg: "HS256" 
 * }
 */