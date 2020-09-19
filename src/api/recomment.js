import jsonp from 'common/js/jsonp'
import { BASE_URL, options } from './config'

export function getRecomment() {
    const url = `${BASE_URL}v/smarttalent/getChuBeiLiang`

    const data = {
        arae: 1
    }

    return jsonp(url, data, options)

}