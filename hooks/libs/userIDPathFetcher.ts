export default function userIDPathFetcher(pathName:string):string{
    return pathName.split('/')[2]
}