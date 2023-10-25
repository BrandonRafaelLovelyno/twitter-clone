const fetcher = async (url: string) => {
  console.log('fetching from ',url)
  const res = await fetch(url);
  const final=await res.json()
  return final
};

export default fetcher;
