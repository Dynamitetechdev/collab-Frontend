import Header from "@/components/navigation/header";

interface LayoutProp {
  children: any;
}

const Layout: React.FC<LayoutProp> = ({ children }) => {
  return (
    <div className="tile_bg main">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
