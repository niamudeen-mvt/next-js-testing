const ProductLabel = ({ text = "text" }: { text: string }) => {
  return (
    <div className="w-max  bg-red-600 text-white text-xs  text-center py-2 px-4 rounded-md">
      {text}
    </div>
  );
};

export default ProductLabel;
