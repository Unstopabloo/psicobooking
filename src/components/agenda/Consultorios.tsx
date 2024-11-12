"use client"

// import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "../ui/card"
// import { Skeleton } from "../ui/skeleton"

// export function Consultorios() {

//   if (isLoading) return <ConsultoriosSkeleton />
//   if (error) return <div>Error: {error.message}</div>

//   return (
//     <>
//       {data?.map((availability) => {
//         return (
//           <button key={availability.id} className="w-full text-left consultorios-card min-w-48">
//             <Card>
//               <CardContent className="p-4">
//                 <CardHeader className="flex-col lg:flex-row items-start gap-y-2 gap-x-6 pt-1">
//                   <CardTitle>{availability.name}</CardTitle>
//                   <p className="text-xs text-muted-foreground">{availability.hour_from} - {availability.hour_to}</p>
//                 </CardHeader>
//                 <CardDescription className="pt-1">{availability.address}</CardDescription>
//               </CardContent>
//             </Card>
//           </button>
//         )
//       })}
//     </>
//   )
// }

// function ConsultoriosSkeleton() {
//   return (
//     <div className="w-full min-w-72 flex flex-col gap-y-4">
//       <Skeleton className="w-full h-24" />
//       <Skeleton className="w-full h-24" />
//       <Skeleton className="w-full h-24" />
//     </div>
//   )
// }