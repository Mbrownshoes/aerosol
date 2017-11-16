library(raster)
library(sp)
library(rgdal)
library(ggplot2)

x<-read.csv('Data/MODAL2_E_AER_OD_2017-11-01_rgb_3600x1800.CSV')

fileN <- paste0('Data/MODAL2_E_AER_OD_2017-11-01_rgb_3600x1800.TIFF')
map <- raster(fileN)
map
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

for(i in 41:44){
  fileN <- paste0('Data/week-',i,'.tiff')
  map <- raster(fileN)
  #manually assign coordinates to crop - India
  cropbox2 <- c(60,95,10,39)
  mapcrop2 <- crop(map, cropbox2)
  mapPoints = as.data.frame(rasterToPoints(mapcrop2))
  colnames(mapPoints)[3] <- 'aer'
  write.csv(mapPoints, file=paste0("Data/week",i,".csv"), row.names=F)
  
}
