export default function (props: any) {
  console.log(
    '===================================================================',
  );
  console.log(props);
  return {
    canAdmin: true,
    canDeleteFoo: false,
    '/admin/user': false,
  };
}
