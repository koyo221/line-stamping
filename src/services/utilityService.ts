export function isLocal() {
    return process.env.REACT_APP_ENV === 'dev';
}
