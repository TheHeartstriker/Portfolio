import React, { useEffect, useRef } from "react";
import { VertexShader, FragmentShader } from "./FragVec";

function Shadow() {
  const canvasRef = useRef(null);
  const vertexShaderRef = useRef(VertexShader);
  const fragmentShaderRef = useRef(FragmentShader);

  useEffect(() => {
    console.clear();

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Initialize shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderRef.current);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error(
        "An error occurred compiling the vertex shader:",
        gl.getShaderInfoLog(vertexShader)
      );
      return;
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderRef.current);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error(
        "An error occurred compiling the fragment shader:",
        gl.getShaderInfoLog(fragmentShader)
      );
      return;
    }

    // Create and link program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(
        "Unable to initialize the shader program:",
        gl.getProgramInfoLog(program)
      );
      return;
    }

    gl.useProgram(program);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    let mousepos = [0, 0];
    const u_mousepos = gl.getUniformLocation(program, "u_mousepos");

    const handlePointerMove = (e) => {
      let ratio = window.innerHeight / window.innerWidth;
      if (window.innerHeight > window.innerWidth) {
        mousepos[0] = (e.pageX - window.innerWidth / 2) / window.innerWidth;
        mousepos[1] =
          ((e.pageY - window.innerHeight / 2) / window.innerHeight) *
          -1 *
          ratio;
      } else {
        mousepos[0] =
          (e.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
        mousepos[1] =
          ((e.pageY - window.innerHeight / 2) / window.innerHeight) * -1;
      }
      gl.uniform2fv(u_mousepos, mousepos);
    };

    window.addEventListener("pointermove", handlePointerMove);

    const textures = [
      {
        name: "noise",
        url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png",
        type: gl.TEXTURE_2D,
        img: null,
        texture: null,
      },
    ];

    const loadImage = (imageObject) => {
      let img = document.createElement("img");
      img.crossOrigin = "anonymous";

      return new Promise((resolve, reject) => {
        img.addEventListener("load", () => {
          imageObject.img = img;
          resolve(imageObject);
        });
        img.addEventListener("error", (e) => {
          reject(e);
        });
        img.src = imageObject.url;
      });
    };

    const loadTextures = (textures) => {
      return new Promise((resolve, reject) => {
        const loadTexture = (pointer) => {
          if (pointer >= textures.length || pointer > 10) {
            resolve(textures);
            return;
          }
          const imageObject = textures[pointer];

          const p = loadImage(imageObject);
          p.then(
            (result) => {
              const texture = gl.createTexture();
              gl.bindTexture(gl.TEXTURE_2D, texture);
              gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                result.img
              );
              gl.generateMipmap(gl.TEXTURE_2D);
              result.texture = texture;
            },
            (error) => {
              console.log("error", error);
            }
          ).finally(() => {
            loadTexture(pointer + 1);
          });
        };
        loadTexture(0);
      });
    };

    loadTextures(textures).then(
      () => {
        // Initialize textures
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textures[0].texture);
        gl.uniform1i(gl.getUniformLocation(program, "u_texture"), 0);

        // Draw something
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      },
      (error) => {
        console.log("error");
      }
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div>
      <canvas id="Shadow" ref={canvasRef}></canvas>
    </div>
  );
}

export default Shadow;
