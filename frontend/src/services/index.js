export function setToken(token) {
    localStorage.setItem('user_token', token)
}
 
 
export function getToken(token) {
    try {
        return localStorage.getItem('user_token');
    } catch (error) {
        return false;
    }
}
 
export function setNivel(nivelAcesso) {
    localStorage.setItem('nivel', nivelAcesso)
}
 
export function getNivel() {
    try {
        return localStorage.getItem('nivel');
    } catch (error) {
        return false;
    }
}
 
export function setId(usuarioId) {
    localStorage.setItem('Id', usuarioId)
}
 
export function getId() {
    try {
        return localStorage.getItem('Id');
    } catch (error) {
        return false;
    }
}