import React from 'react';
import {authUser} from "@/components/utils/ServerUtils";

export type PageProps = {
}

const Page = async (props: PageProps) => {
  await authUser();

  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        Hello
      </section>
    </>
 );}

export default Page;
