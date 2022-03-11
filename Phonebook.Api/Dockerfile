
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
RUN apt-get update 
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

FROM node:17-alpine as build-node
COPY ["/ClientApp/package.json", "ClientApp/"]
COPY ["/ClientApp/package-lock.json", "ClientApp/"]
WORKDIR /ClientApp
RUN npm install
COPY /ClientApp/ . 
RUN npm run build  

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
RUN apt-get update 
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

WORKDIR /src
COPY ["PhonebookAPI.csproj", "."]
RUN dotnet restore "PhonebookAPI.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "PhonebookAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PhonebookAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=build-node /ClientApp/public ./ClientApp/build
ENTRYPOINT ["dotnet", "PhonebookAPI.dll"]
