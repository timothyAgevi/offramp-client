import Link from "next/link";
import { useRouter } from "next/router";

const addTrailingSlash = (path: any) => {
  return path.endsWith("/") ? path : `${path}/`;
};


export const matchCurrentPathWithGivenLink = (currentPath: any, link: any) => {
  const currentPathWithoutQuery = currentPath.split("?")[0]; // Remove query parameters from current path
  const linkWithoutQuery = link.split("?")[0]; // Remove query parameters from link

  const currentPathWithTrailingSlash = addTrailingSlash(currentPathWithoutQuery); // Add trailing slash to current path if it doesn't have one
  const linkWithTrailingSlash = addTrailingSlash(linkWithoutQuery); // Add trailing slash to link if it doesn't have one

  const regex = new RegExp(`^${linkWithTrailingSlash}$`, "gi");

  return regex.test(currentPathWithTrailingSlash);
};

const CustomNavlinkV2 = (props: any) => {

  const router = useRouter()
  const match = matchCurrentPathWithGivenLink(router.asPath, props?.href)
  return (
      <Link href={props?.href} passHref>
          <button style={{
              border: "none",
              // color: theme.colors.pink[6],
              background: match ? "black" : "white",
              color: match ? 'white' :'black',
              // fontSize: "1px",
              fontWeight: 500,
              borderRadius: "20px",
              padding: "15px 25px",
          }}>
              {props?.label}
          </button>
      </Link>
  )
}

const Navigation = () => {
    return (
      <div className="tabs" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        columnGap: '10px'
      }}>
        <CustomNavlinkV2 href={'/'} label={'Offramp'} />
        <CustomNavlinkV2 href={'/onramp'} label={'Onramp'} />
        <CustomNavlinkV2 href={'/donate'} label={'Donations'} />
      </div>
    );
  };
  export default Navigation;