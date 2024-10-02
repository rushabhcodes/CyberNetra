import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Adjust the import based on your setup

const OSINT = () => {
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>Open Source Intelligence Framework </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="absolute inset-0 bg-black opacity-30 pointer-events-none"></div> {/* Semi-transparent overlay */}
        <iframe
          src="https://osintframework.com/"
          width="100%"
          height="1000px"
          style={{ border: "none" }}
          title="OSINT Framework"
          loading="lazy"
          className="rounded-lg relative z-10"
        />
      </CardContent>
    </Card>
  );
};

export default OSINT;
