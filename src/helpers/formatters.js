import {format, fromUnixTime} from 'date-fns';

export function formatFromUnix(unix, pattern) {
    return format(fromUnixTime(unix / 1000), pattern);
}