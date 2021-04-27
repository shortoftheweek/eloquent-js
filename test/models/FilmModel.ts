
import { Model } from '../../src/index';

/**
 * Film Model
 *
 * @type Model
 */
export default class FilmModel extends Model
{
    /**
     * Endpoint key
     *
     * https://api.sotw.com/v1/{endpoint}
     *
     * @type string
     */
    public endpoint: string = 'film';

    /**
     * List of fields available
     *
     * @type string[]
     */
    public fields: string[] = [
        'id',
        'source_type',
        'source_url',
        'start_time',
        'end_time',
        'duration',
        'website',
        'publicity',
        'publicity_type',
        'is_external',
    ];
}
