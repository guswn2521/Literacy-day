### nginx 사용

FROM nginx

# nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사

# RUN rm -rf /etc/nginx/conf.d/default.conf

# 만약 그냥 conf 라고 경로를 주면 => 현 프로젝트 경로의 conf/conf.d/default.conf 중 conf.d/default.conf 넘어감

COPY ./conf/nginx.conf /etc/nginx/nginx.conf

# 위에서 생성한 앱의 빌드산출물을 nginx의 실플 앱이 사용하던 폴더로 이동

# COPY --from=builder /elice/node_docker/build /usr/share/nginx/html

# 80포트 오픈하고 nginx 실행

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
