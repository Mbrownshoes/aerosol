library(raster)
library(sp)
library(rgdal)
library(ggplot2)
library(dplyr)
x<-read.csv('Data/MODAL2_E_AER_OD_2017-11-01_rgb_3600x1800.CSV')

fileN <- paste0('Data/week-41.tiff')
map <- raster(fileN)
map
map[map == 255] <- NA #takes a while
map@crs

hist(map,main='Distribution of Aerosol values',
     col='purple',
     maxpixels=6500000)
plot(map,main='Aerosol values')

col <-heat.colors(100)
image(map,zlim=c(0,200),col=col)

#Crop the raster
plot(map)
cropbox1 <- drawExtent()

#crop the raster, then plot the new cropped raster
mapcrop1 <- crop(map, cropbox1)
plot(mapcrop1)

#manually assign coordinates to crop - India
cropbox2 <- c(60,95,10,39)
mapcrop2 <- crop(map, cropbox2)

plot(mapcrop2)
mapcrop2

mapPoints = as.data.frame(rasterToPoints(mapcrop2))
colnames(mapPoints)[3] <- 'aer'
write.csv(mapPoints, file=paste0("Data/","nov1",".csv"), row.names=F)

datalist =list()
j=0
for(i in 41:44){
  j=j+1
  fileN <- paste0('Data/week-',i,'.tiff')
  map <- raster(fileN)
  #remove non measurements
  map[map == 255] <- 0 #takes a while
  map[is.na(map)] <- 0 
  
  #manually assign coordinates to crop - India  
  # cropbox2 <- c(60,95,9,39)
  cropbox2 <- c(60,100,5,39)
  mapcrop2 <- crop(map, cropbox2)
  mapPoints = as.data.frame(rasterToPoints(mapcrop2))
  # mapPoints <- mutate(mapPoints,week=i)
  colnames(mapPoints)[3] <- 'aer'
  
  #order points by x and y
  m<-mapPoints[order(mapPoints$x,mapPoints$y),]
 
  #get lat long
  coords<-dplyr::select(mapPoints,x,y)
  #points
  mapPoints<-dplyr::select(mapPoints,aer)
  if(j==1){
    write.csv(coords, file=paste0("regl/coordinates",".csv"), row.names=F)
  }
  write.csv(mapPoints, file=paste0("regl/week-",i,".csv"), row.names=F)
  datalist[[j]] <- mapPoints
}
x <- bind_rows(datalist)
write.csv(x, file=paste0("regl/week-41-44",".csv"), row.names=F)
