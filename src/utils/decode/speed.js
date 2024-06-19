/*
 * Copyright 2024 Jorge Toro Hoyos (jolthgs@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// revisar si estas funciones estan bien
//function nodeToKph(nodes) {
//  return math.floor(nodes * 1.852);
//}
//
//function mphToKph(m) {
//  return math.floor(m * 1.609344);
//}

/**
 * Convert knot/h to km/h. The speed is retuned in km/h. 
 */
export const knotHTokmH = (speed) => speed*1.852;

