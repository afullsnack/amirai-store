import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const getCountries = async () => {
  const res = await fetch(
    `https://countriesnow.space/api/v0.1/countries/currency`,
  );

  return (await res.json())?.data;
};

type Args = {
  country: string | undefined;
  setCountry: (value: string) => void;
};
export const Settings = async ({ country, setCountry }: Args) => {
  const countries: Array<any> = await getCountries();

  return (
    <>
      <Select value={country} onValueChange={(value) => setCountry(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Countries</SelectLabel>
            {countries.map((country, idx) => (
              <SelectItem key={idx} value={country?.iso3}>
                {country?.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Changing the country will change the default currency
        </AlertDescription>
      </Alert>
    </>
  );
};
