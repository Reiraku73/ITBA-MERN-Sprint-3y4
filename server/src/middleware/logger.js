export default function logger (req, res, next) {
    console.log(req.method)
    console.log(req.url)
    next()
}