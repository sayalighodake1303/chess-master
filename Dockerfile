FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

EXPOSE 10000

CMD ["java", "-jar", "target/chess-master-1.0.0.jar", "--server.port=10000", "--server.address=0.0.0.0"]